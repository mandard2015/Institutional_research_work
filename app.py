from flask import Flask, render_template, request,jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import func
# import csv

app = Flask(__name__)
CORS(app)#,origins="http://localhost:3000")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///research.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the ResearchWork model
class Research(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    domain = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    author = db.Column(db.String(255), nullable=False)
    publication_type = db.Column(db.String(50), nullable=False)

# Create the database tables
with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/research',methods=['GET','POST'])
def get_research():
    try:
        print("got it")
        author = request.args.get('author', '')
        year = request.args.get('year', '')
        domain = request.args.get('domain', '')
        publication_type = request.args.get('publication_type', '')

        query = Research.query

        if author:
            query = query.filter(Research.author.ilike(f"%{author}%"))
        if year:
            query = query.filter(Research.year == year)
        if domain:
            query = query.filter(Research.domain.ilike(f"%{domain}%"))
        if publication_type:
            query = query.filter(Research.publication_type == publication_type)

        results = query.all()
        print(f"Author: {author}, Year: {year}, Domain: {domain}, Publication Type: {publication_type}")
        print(f"Generated SQL Query: {query.statement}")
        print(f"Results: {results}")
        serialized_results=[{'id':i.id,'author':i.author,'title':i.title,'year':i.year,'domain':i.domain,'publication_type':i.publication_type} for i in results]
        return jsonify(serialized_results)
    except Exception as e:
        return jsonify({'error':str(e)}),500
    
@app.route('/add', methods=['POST'])
def add():
    title = request.json['title']
    domain = request.json['domain']
    year = request.json['year']
    author = request.json['author']
    publication_type = request.json['publicationType']
    print(title)
    print(author)
    print(year)
    print(domain)
    print(publication_type)
    new_research = Research(title=title, domain=domain, year=year, author=author, publication_type=publication_type)
    db.session.add(new_research)
    db.session.commit()
    return redirect('/')

@app.route('/edit',methods=['POST'])
def edit():
    id = request.json.get('id', '')
    print(id)
    result = Research.query.filter(Research.id == id)
    research=result.all()

    title=request.json.get('title','')
    author = request.json.get('author', '')
    year = request.json.get('year', '')
    domain = request.json.get('domain', '')
    publication_type = request.json.get('publicationType', '')
    
    for i in research:
        i.title=title
        i.domain=domain
        i.year=year
        i.author=author
        i.publication_type=publication_type
    db.session.commit()

    return redirect(url_for('index'))

@app.route('/delete',methods=['POST'])
def delete():
    id = request.json.get('id', '')
    print(id)
    result = Research.query.filter(Research.id == id)
    research=result.all()
    print(research)
    for i in research:
        db.session.delete(i)
    db.session.commit()
    return redirect(url_for('index'))

@app.route('/api/domain-distribution', methods=['GET'])
def get_domian_distribution():
    domian_distribution = db.session.query(Research.domain, func.count()).group_by(Research.domain).all()
    result = [{'domain': domain, 'count': count} for domain, count in domian_distribution]
    print(result)
    return jsonify(result)

@app.route('/api/yearly-publication-count', methods=['GET'])
def get_yearly_publication_count():
    yearly_publication_count = db.session.query(Research.year, func.count()).group_by(Research.year).all()
    result = [{'year': year, 'count': count} for year, count in yearly_publication_count]
    print(result)
    return jsonify(result) 

@app.route('/api/publication-trend', methods=['GET'])
def get_publication_trend():
    publication_trend = db.session.query(Research.year, func.count()).group_by(Research.year).order_by(Research.year).all()
    result = [{'year': year, 'count': count} for year, count in publication_trend]
    print(result)
    return jsonify(result) 
#''' def import_data(csv_file_path):
#     with app.app_context():
#         with open(csv_file_path, 'r') as file:
#             reader = csv.DictReader(file)
#             for row in reader:
#                 new_research = Research(
#                     title=row['Title'],
#                     domain=row['Domain'],
#                     year=int(row['Year']),
#                     author=row['Faculty'],
#                     publication_type=row['Ptype']
#                 )
#                 db.session.add(new_research)
#         db.session.commit()
# import_data('books_new.csv')
# import_data('journal_new.csv')
# import_data('Conference.csv')'''

# @app.route('/admin')
# def admin():
#     research_data = Research.query.all()
#     return render_template('index.html', research_data=research_data)

if __name__ == '__main__':
    app.run(debug=True)
